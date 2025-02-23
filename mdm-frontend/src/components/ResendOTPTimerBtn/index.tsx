import { useCallback, useEffect, useState } from "react"
import Text from "../Text"
import Colors from "src/Colors"
import Button from "../Button"
import { ResendOTPTimerBtnProps } from "src/types"

const ResendOTPTimerBtn: React.FC<ResendOTPTimerBtnProps> = ({
    isLoading,
    initTimeDiff,
    onClick
  }) => {
    const [startTime, setStartTime] = useState<number>(Date.now())
    const [timeDiff, setTimeDiff] = useState<number>(initTimeDiff)
    const [intervalRef, setIntervalRef] = useState<any>(undefined)
    const [canResend, setCanResend] = useState<boolean>(false)
  
    const getTimeDiff = useCallback(() => {
        const actDiff = (Date.now() - startTime) / 1000
        return (timeDiff - actDiff)
    }, [timeDiff, startTime])
  
    const getNewIntervalRef = () => {
      const intervalReference = setInterval(() => {
        const newTimeDiff = getTimeDiff()
        if (newTimeDiff >= 0) {
          setCanResend(false)
          setTimeDiff(newTimeDiff)
        } else {
          setCanResend(true)
          clearInterval(intervalReference)
        }
      }, 1000)
      return intervalReference
    }
  
    const resetTimer = () => {
      clearInterval(intervalRef)
      setIntervalRef(undefined)
      setTimeDiff(initTimeDiff)
    }
  
    const startTimer = () => {
      setStartTime(Date.now())
      setIntervalRef(getNewIntervalRef())
    }
  
    const timeDiffToStr = (timeDiff: number) => {
      const timeDiffIntVal = parseInt(timeDiff.toString())
      const mins = Math.floor(timeDiffIntVal / 60)
      const secs = timeDiffIntVal % 60
      const minsStr = (mins !== 0) ? `${mins}mins`: ''
      return `${minsStr} ${secs}secs`
    }
  
    useEffect(() => {
      if (canResend) {
        resetTimer()
      }
    }, [canResend])
  
    const handleResendOtpClick = () => {
      onClick()
    }
  
    useEffect(() => {
      if (!isLoading) {
        startTimer()
      }
    }, [isLoading])
  
    if (!canResend || isLoading) {
      return (
        <Text
            className="my-4"
            style={{
                textAlign: "center",
                color: '#00ADEF'
            }}
            fontSize="11px"
            fontWeight="600">
                Resend OTP in {timeDiffToStr(timeDiff)}
        </Text>
      )
    }
    return (
        <Button
            size="sm"
            onClick={handleResendOtpClick}
            className="w-100 p-1"
            bgColor={Colors.primary}
            color={Colors.primaryNegative}
            fontSize='10px'>
            Resend OTP
        </Button>
    )
}

export default ResendOTPTimerBtn