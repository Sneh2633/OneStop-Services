import { useEffect, useState } from "react";

export default function VendorFeedback() {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/getFeedback")
            .then(resp => resp.json())
            .then(data => setFeedbacks(data))
            .catch(error => console.error('Error fetching feedbacks:', error));
    }, []);

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
        </div>
    )
}
