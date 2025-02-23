import { Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { viewServiceStatusTable } from "src/api/Pages/Dashboard";
import Card from "src/components/Card";
import FieldList from "src/components/FieldList";
// import WidgetSkeletonLoader from "src/components/WidgetSkeletonLoader";
import { Field } from "src/types";
import { convertObjectToList } from "src/utility";
import { SVGIcon } from "src/assets/SvgIcons/IconMap";

const serviceStatusTable: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<any>({});
  const [config, setConfig] = useState<any>({});
  const [fields, setFields] = useState<Field[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);


  useEffect(() => {
    setIsLoading(true)
    viewServiceStatusTable()
      .then(({ data }: any) => {
        setIsLoading(false)
        setApiData(data?.data)
        setFields(convertObjectToList(data.config.fields))
        setConfig(data?.config)
        setIsSuccess(true)
      })
    }, [])


  return (
    <Card>
            <div className="widget details-widget widget-user-actions">
                {/* {isLoading && <WidgetSkeletonLoader numLines={2}/>} */}
                {!isLoading && isSuccess &&
                <>
                <div className="d-flex flex-row justify-content-center">
                    <span className="p-1 pe-3" style={{height: '30px', width: '35px'}}>
                        <SVGIcon iconName="Financials"/>
                    </span>
                    <p className="flex-grow-1 mb-0 ps-1" style={{fontWeight: "700", fontSize: "20px"}}>
                        {config.label}
                    </p>
                </div>
                <Divider/>
                <FieldList data={apiData} fields={fields}/>
                </>}
            </div>
        </Card>
  );
};

export default serviceStatusTable;
