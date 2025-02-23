import { Skeleton } from "@chakra-ui/react"

type WidgetSkeletonLoaderProps = {
    numLines: number,
}

const WidgetSkeletonLoader: React.FC<WidgetSkeletonLoaderProps> = ({
    numLines
}) => {
    return (
        <div className="d-flex flex-column gap-1">
            {Array(numLines).fill(numLines).map((_, i) => {
                return <Skeleton key={i} height="20px"/>
            })}
        </div>
    )
}

export default WidgetSkeletonLoader