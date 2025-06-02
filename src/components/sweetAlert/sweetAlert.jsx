import SweetAlert from "react-bootstrap-sweetalert";

function SweetAlertComponent({ confirm, cancle, title, subtitle, type = "warning" }) {
    return (
        <SweetAlert
            showCancel={false}
            title={title}
            onConfirm={confirm}
            onCancel={cancle}
            show={true}
            customButtons={
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
                    <button
                        onClick={cancle}
                        style={{
                            backgroundColor: '#cfd8dc',
                            color: '#37474f',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontWeight: '500',
                            cursor: 'pointer',
                            minWidth: '100px',
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirm}
                        style={{
                            backgroundColor: '#e53935',
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            fontWeight: '600',
                            cursor: 'pointer',
                            minWidth: '120px',
                        }}
                    >
                        Yes, delete it!
                    </button>
                </div>
            }
            type={type}
        >
            <p style={{ fontSize: "16px", color: "#555", marginBottom: 0 }}>
                {subtitle}
            </p>
        </SweetAlert>
    );
}

export default SweetAlertComponent;
