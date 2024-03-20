import React from 'react';
import { Box,  Stack } from '@chakra-ui/react'
import Card from './Card';
import axios from 'axios';
const Home = () => {


    //this checkOutHandler is called when clicked on Buy Now button
    const checkOutHandler = async (amount) => {

        const { data: { key } } = await axios.get("http://localhost:4000/api/getKey")

        const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
            amount
        })
       
// created options for razorpay instance we will give all these options to razorpay api
        var options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Amit Lakade",
            description: "Test Transaction",
            image: "https://media.istockphoto.com/id/808070602/photo/hand-holding-mobile-with-pay-word-and-bill-icon-feature-with-blur-back-office-counter.jpg?b=1&s=612x612&w=0&k=20&c=SWqJtyuC8479Cqsvi1kcbZzQgv-BCyTdG3JRGgpU9dw=",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentverification", // after payemnt done this url is called
            prefill: {
                name: "Amit Lakade",
                email: "amitlakade@gmail.com",
                contact: "9168830229"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };

// It will open pop up window  with options to do payment
        const razor = new window.Razorpay(options);

        razor.open();

    }
    return (
        <Box>
            <Stack h={"100vh"} justifyContent="Center" alignItems="Center " direction={["column ,row"]}>
                <Card amount='${amount}' checkOutHandler={checkOutHandler} />
                {/* <Card amount='8000' checkOutHandler={checkOutHandler} /> */}
            </Stack>
        </Box>
    );
}

export default Home;