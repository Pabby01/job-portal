import '../styles/Modal.css';


const SuccessPage = () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h4>You've successfully Logged in {user.name.toUpperCase()}</h4>
                </div>
                <div className="modal-body">
                    {console.log(user, '000000000')}
                </div>
                <div className="modal-footer">
                    Go get those gigs!!
                </div>
            </div>
        </div>
    )
}

export default SuccessPage;
