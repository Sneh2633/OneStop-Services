import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function VendorFeedback() {
    const { vendorId } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate(); // Using useNavigate for navigation

    useEffect(() => {
        // Make sure vendorId is available before making the fetch request
        console.log(vendorId);
        if (vendorId) {
            fetch(`http://localhost:8080/getFeedback/${vendorId}`)
                .then(resp => resp.json())
                .then(data => setFeedbacks(data))
                .catch(error => console.error('Error fetching feedbacks:', error));
        }
    }, [vendorId]); // Include vendorId as a dependency for useEffect

    const goBack = () => {
        navigate(-1); // This will navigate back to the previous page
    };

    return (
        <div className="container">
            <table className="table table-bordered" style={{ margin: "20px", padding: "10px" }}>
                <thead className="thead-dark">
                    <tr>
                        <th>Comments</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback, index) => (
                        <tr key={index}>
                            <td>{feedback.comments}</td>
                            <td>{feedback.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={goBack} className="btn btn-primary" style={{ marginBottom: "20px", marginLeft: "20px", padding: "10px 20px" }}>Back</button>
            </div>
        </div>
    );
}
