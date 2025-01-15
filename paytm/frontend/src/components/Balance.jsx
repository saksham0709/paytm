import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = ({ value }) => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                setBalance(response.data.Balance); // Update state with fetched balance
            } catch (err) {
                setError("Failed to fetch balance"); // Handle errors
                console.error(err);
            }
        };

        fetchBalance(); // Call the async function
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div >
            <div className="font-semibold ml-4 text-lg">Rs {balance}</div>
        </div>
    );
};
