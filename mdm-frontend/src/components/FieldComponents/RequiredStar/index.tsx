export type RequiredStarProp = {
    required: boolean
}

const RequiredStar: React.FC<RequiredStarProp> = ({
    required
}) => {
    if (required)
        return (
            <span className="px-1" style={{color: 'red'}}>*</span>
        )
    return (<></>)
}

export default RequiredStar