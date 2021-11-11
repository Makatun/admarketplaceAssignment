import { Link } from "react-router-dom";


type Props = {
    children?: JSX.Element | JSX.Element[];
};

const ErrorContainer: React.FC<Props> = ({ children }) => {


    return (
        <div className="pageContent" style={{ justifyContent: 'center', display: 'flex', alignItems: 'flex-start' }}>
            <main style={{ marginTop: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '30px', color: 'dodgerblue' }}>
                {children}
                <Link style={{ marginTop: '50px' }} to="/">Go to Home</Link>
            </main>
        </div>
    )

}

export default ErrorContainer
