import Button from "src/components/Button"
import { getTableState, useSelector } from "src/selectors"
import { FieldObject, Meter } from "src/types"

type DownloadCSVProps = {
    tableId: string,
    api: (filters: any) => Promise<any>
}

const DownloadCSV: React.FC<DownloadCSVProps> = ({
    tableId,
    api
}) => {
    const selector = useSelector()
    const tableData = selector(getTableState(tableId))
    const filters = tableData?.filters?.additionalFilters ?? []

    const downloadCSV = async () => {
        console.log({
            additionalFilters: filters,
            getAll: true
        })
        const data = await api({
            additionalFilters: filters,
            getAll: true
        })
        console.log("Data recieved for downlaoding csv", data)

        const csvHeaders: FieldObject = data.data?.config.columns; 
        const csvData: Meter[] = data.data.data?.rows; 
        if (!csvHeaders || !csvData.length) {
            return;
        }

        const csvColumnNames = csvHeaders.order
            .map((key) => csvHeaders[key]?.label)
            .filter(Boolean); 

        const csvRows = [
            csvColumnNames.join(','),
            ...csvData.map((row: any) =>
                csvHeaders.order
                    .map((key) => {
                        let cellData: string = '';
                        if (key === 'tarrifName') {
                            cellData = row.tarrifName?.label || '';
                        }else if(key === 'user'){
                            cellData = row.user?.label || '';
                        }else {
                            cellData = row[key as keyof typeof row] || '';
                        }
                        // Handle CSV escaping (quotes and commas)          
                        if (typeof cellData === 'string') {
                            cellData = cellData.replace(/"/g, '""'); 
                            if (cellData.includes(',') || cellData.includes('\n')) {
                                cellData = `"${cellData}"`;
                            }
                        }
                        return cellData;
                    })
                    .join(',') 
            ),
        ].join('\n'); 

        const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        // link.setAttribute('download', 'MeterPushData.csv');
        link.setAttribute('download', `${tableId || 'download'}.csv`)
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); 
    }
    return (
        <Button size="sm" onClick={downloadCSV}>
            Download CSV
        </Button>
    )
}

export default DownloadCSV