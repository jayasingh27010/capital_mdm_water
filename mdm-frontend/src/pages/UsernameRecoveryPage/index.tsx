import { useCallback, useEffect, useState } from "react";
import Colors from "src/Colors";
import AccountRecovery from "src/components/AccountRecovery";
import Button from "src/components/Button";
import FieldList from "src/components/FieldList";
import Text from "src/components/Text";
import { Field } from "src/types";
import "./styles.css"
import ResendOTPTimerBtn from "src/components/ResendOTPTimerBtn";
import { sendOTP, verifyOTP } from "src/api/OTP";
import { useNavigate } from "react-router-dom";
import Routes from "src/Routes";
import { useToast } from "@chakra-ui/react";

const FIELDS: Field[] = [
  {
    id: "username",
    label: "Username",
    columnSize: 12,
    inputType: "textInput",
    required: true
  }
]

const pinInputFields: Field[] = [
  {
    id: "OtpGenerated",
    label: "Input Pin Recieved On Email",
    columnSize: 12,
    required: true,
    inputType: "pinInput",
  }
]

const UsernameRecoveryPage = () => {
  const [isFirstOTPSent, setIsFirstOTPSent] = useState<boolean>(false)
 // const [sendOTPLocation, setSendOTPLocation] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [sendOTPLocation, setSendOTPLocation] = useState<string>("")
  const [isLoadingVerifyOTP, setIsLoadingVerifyOTP] = useState<boolean>(false)
  const [fieldData, setFieldData] = useState<any>({})
  const [pinFieldData, setPinFieldData] = useState<any>({})
  // const [error, setError] = useState<string | undefined>(undefined)
  const [fields, setFields] = useState<Field[]>(FIELDS)
  const [isInvalid, setIsInvalid] = useState<boolean>(true)
  const [otpTimeout, setOtpTimeout] = useState<boolean>(false);


  const navigate = useNavigate()
  const toast = useToast()

  const handleOTPSend = (e?: any) => {
    e?.preventDefault()
    setIsLoading(true)
    if (isLoading) {
      return
    }
    sendOTP({
      ...fieldData
    })
      // .then(({  }: any) => {
      //   setIsFirstOTPSent(true)
      //   if(otpTimeout){
      //     setOtpTimeout(true)
      //   }else{
      //     setOtpTimeout(false)
      //   }
      //   setTimeout(() => {
      //     setOtpTimeout(true); 
      //   }, 30000); 
      
      // })
      .then(({  }: any) => {
        // setSendOTPLocation(data.otpSendLocation)
        setIsFirstOTPSent(true)
        if(otpTimeout){
          setOtpTimeout(true)
        }else{
          setOtpTimeout(false)
        }
        setTimeout(() => {
          setOtpTimeout(true); 
        }, 30000); 
      
      })
      .catch(e => {
        console.error(e)
        toast({
          title: 'Username Not Registered',
          description: 'This username is not registered with us',
          status: 'warning',
          duration: 3000
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const verifyOtpPromise = () => {
    return new Promise((resolve, reject) => {
      setIsLoadingVerifyOTP(true)
      verifyOTP({
        otpTimeout: JSON.stringify(otpTimeout),
        ...fieldData,
        ...pinFieldData
      })
        .then(({  }: any) => {
          localStorage.setItem("change-password-session-token", fieldData?.username)
          navigate(Routes.ChangePassword)
          resolve(true)
        })
        .catch(() => {
          setPinFieldData({
            OtpGenerated: ""
          })
          reject(false)
        })
        .finally(() => {
          setIsLoadingVerifyOTP(false)
        })
    })
  }




  // const verifyOtpPromise = () => {
  //   return new Promise((resolve, reject) => {      
  //     setIsLoadingVerifyOTP(true); 
  //     setError(undefined); 
  //         verifyOTP({
  //         ...fieldData,
  //         ...pinFieldData
  //       })
  //     setTimeout(() => {                
  //         localStorage.setItem("change-password-session-token", "mock-token");
  //         navigate(Routes.ChangePassword);
  //         resolve(true);

  //     }, 1000); 
  //   })
  //   .catch((error) => {
  //     setError(error.message); 
  //     setPinFieldData({ OtpGenerated: "" }); 
  //   })
  //   .finally(() => {
  //     setIsLoadingVerifyOTP(false); 
  //   });
  // };

  const handleSubmit = () => {
    if (isLoadingVerifyOTP) {
      return
    }
    toast.promise(
      verifyOtpPromise(),
      {
        success: { title: 'OTP Verification Success', description: 'OTP successfully Verified', duration: 3000 },
        loading: { title: 'Verifying..', description: 'Please wait while we verify OTP' },
        error: { title: 'Invalid OTP', description: 'Invalid OTP Try Again'}
      }
    )
  }

  const handleChange = (fieldId: string, value: any) => {
      setFieldData({
        ...fieldData,
        [fieldId]: value
      })
  }

  const handlePinChange = (fieldId: string, value: any) => {
    setPinFieldData({
      ...pinFieldData,
      [fieldId]: value
    })
  }

  useEffect(() => {
    if (pinFieldData?.OtpGenerated?.length === 6) {
      handleSubmit()
    }
  }, [pinFieldData])

  useEffect(() => {
    setFields((fields) => {
      return fields.map((field) => {
        if (field.id === 'username')
            return {
              ...field,
              disabled: isFirstOTPSent
            }
        return field
      })
    })
  }, [isFirstOTPSent])

  useEffect(() => {
    setIsInvalid((fieldData?.username?.length ?? 0) < 3)
  }, [fieldData])

  const validations = useCallback(() => {
    if (!fieldData.username)
      return false
    return isInvalid
  }, [fieldData, isInvalid])

  return (
    <AccountRecovery>
      <Text
        className="mt-2"
        textAlign="center"
        color="black"
        fontSize="md"
        fontWeight="300">
        Password Recovery (From Username)
      </Text>
      <form onSubmit={handleOTPSend}>
        <FieldList
          validations={validations}
          fields={fields}
          data={fieldData}
          onChange={handleChange} />
          {!isFirstOTPSent && (
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Button
                    disabled={isInvalid}
                    type="submit"
                    size="sm"
                    className="w-100 my-2 p-1"
                    bgColor={Colors.primary}
                    color={Colors.primaryNegative}
                    fontSize='12px'>
                    Send OTP
                  </Button>
                </div>
              </div>
            </div>
          )}
      </form>
      {isFirstOTPSent && (
        <div>
          {/* <Text
            className="mb-0 py-2"
            color="#000"
            textAlign="center"
            fontSize="12px">
            OTP Sent On {sendOTPLocation}
          </Text> */}
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  className="d-flex flex-column justify-content-center my-2"
                  style={{height: '35px'}}>
                {isFirstOTPSent &&
                  !isLoading && (
                    <div className="my-2">
                      <ResendOTPTimerBtn
                      isLoading={isLoading}
                          initTimeDiff={30}
                      onClick={handleOTPSend} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <FieldList
            onChange={handlePinChange}
            fields={pinInputFields}
            data={pinFieldData}/>
        </div>
      )
      }
    </AccountRecovery>
  )

}
export default UsernameRecoveryPage;