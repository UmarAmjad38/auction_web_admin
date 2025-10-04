const images = [
    '/assets/pngs/jacket.png',
    '/assets/pngs/mercedes.png',
    '/assets/pngs/watch.png',
    '/assets/pngs/mercedes.png'
]

const lots = [
    {
        id: 1,
        lotNumber: "1",
        name: "Elegant Gold Necklace Collection",
        description: "A vintage gold necklace with intricate design.",
        countDown: "1 day",
        location: "New York, USA",
        image: '/assets/pngs/jacket.png',
        images: images,
        type: "current",
        highestBid: "12,000.90",
        sold: true,
        details: {
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae laudantium repudiandae dignissimos, numquam quod id, aliquid itaque at recusandae amet temporibus harum. Error, sunt a. Ipsum vel quae dolorem ducimus tempore fugit culpa itaque, accusantium odit! Nesciunt sint quod eligendi?",
            date: "23-04-2024 to 30-04-2024",
            time: "08:00 AM to 12:00 PM",
            orderNumber: 123,
            lot: 10,
            category: "Jewelry",
            subCategory: "Necklaces",
            winner: {
                email: "winner1@example.com",
                phone: "+61(09)7866 3431",
                location: "#53 Prince Juan Carlos Washington Square S, New York, NY 10012, USA"
            }
        }
    },
    {
        id: 2,
        lotNumber: "2",
        name: "Luxury Diamond Ring Collection",
        description: "A rare diamond ring with flawless clarity.",
        countDown: "2 days",
        location: "United Kingdom, London",
        image: '/assets/pngs/mercedes.png',
        images: images,
        type: "past",
        highestBid: "12,000.90",
        sold: false,
        details: {
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae laudantium repudiandae dignissimos, numquam quod id, aliquid itaque at recusandae amet temporibus harum. Error, sunt a. Ipsum vel quae dolorem ducimus tempore fugit culpa itaque, accusantium odit! Nesciunt sint quod eligendi?",
            date: "25-04-2024 to 01-05-2024",
            time: "09:00 AM to 01:00 PM",
            orderNumber: 456,
            lot: 15,
            category: "Jewelry",
            subCategory: "Rings",
            winner: {
                email: "winner2@example.com",
                phone: "+44(20)8765 4321",
                location: "#12 Queen's Square, London, UK"
            }
        }
    },
    {
        id: 3,
        lotNumber: "3",
        name: "Beautiful Pearl Earrings Collection",
        description: "A pair of elegant pearl earrings.",
        countDown: "3 days",
        location: "Pakistan, Islamabad",
        image: '/assets/pngs/jacket.png',
        images: images,
        type: "current",
        highestBid: "12,000.90",
        sold: false,
        details: {
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae laudantium repudiandae dignissimos, numquam quod id, aliquid itaque at recusandae amet temporibus harum. Error, sunt a. Ipsum vel quae dolorem ducimus tempore fugit culpa itaque, accusantium odit! Nesciunt sint quod eligendi?",
            date: "26-04-2024 to 02-05-2024",
            time: "10:00 AM to 02:00 PM",
            orderNumber: 789,
            lot: 20,
            category: "Jewelry",
            subCategory: "Earrings",
            winner: {
                email: "winner3@example.com",
                phone: "+92(51)7654 3210",
                location: "#45 Blue Area, Islamabad, Pakistan"
            }
        }
    },
    {
        id: 4,
        lotNumber: "4",
        name: "Vintage Antique Brooch Collection",
        description: "A beautifully crafted antique brooch.",
        countDown: "5 days",
        location: "New York, USA",
        image: '/assets/pngs/mercedes.png',
        images: images,
        type: "past",
        highestBid: "12,000.90",
        sold: false,
        details: {
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae laudantium repudiandae dignissimos, numquam quod id, aliquid itaque at recusandae amet temporibus harum. Error, sunt a. Ipsum vel quae dolorem ducimus tempore fugit culpa itaque, accusantium odit! Nesciunt sint quod eligendi?",
            date: "27-04-2024 to 03-05-2024",
            time: "11:00 AM to 03:00 PM",
            orderNumber: 234,
            lot: 30,
            category: "Antiques",
            subCategory: "Brooches",
            winner: {
                email: "winner4@example.com",
                phone: "+61(09)7866 1212",
                location: "#23 Liberty Street, New York, NY 10005, USA"
            }
        }
    },
    {
        id: 5,
        lotNumber: "5",
        name: "Stylish Silver Bracelet Collection",
        description: "A delicate silver bracelet with intricate carvings.",
        countDown: "7 days",
        location: "United Kingdom, London",
        image: '/assets/pngs/watch.png',
        images: images,
        type: "current",
        highestBid: "12,000.90",
        sold: false,
        details: {
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae laudantium repudiandae dignissimos, numquam quod id, aliquid itaque at recusandae amet temporibus harum. Error, sunt a. Ipsum vel quae dolorem ducimus tempore fugit culpa itaque, accusantium odit! Nesciunt sint quod eligendi?",
            date: "28-04-2024 to 04-05-2024",
            time: "12:00 PM to 04:00 PM",
            orderNumber: 567,
            lot: 40,
            category: "Jewelry",
            subCategory: "Bracelets",
            winner: {
                email: "winner5@example.com",
                phone: "+44(20)1234 5678",
                location: "#10 Oxford Street, London, UK"
            }
        }
    },
    {
        id: 6,
        lotNumber: "6",
        name: "Classic Vintage Watch Collection",
        description: "A rare vintage wristwatch from the 1950s.",
        countDown: "9 days",
        location: "Pakistan, Islamabad",
        image: '/assets/pngs/jacket.png',
        images: images,
        type: "past",
        highestBid: "12,000.90",
        sold: true,
        details: {
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae laudantium repudiandae dignissimos, numquam quod id, aliquid itaque at recusandae amet temporibus harum. Error, sunt a. Ipsum vel quae dolorem ducimus tempore fugit culpa itaque, accusantium odit! Nesciunt sint quod eligendi?",
            date: "29-04-2024 to 05-05-2024",
            time: "01:00 PM to 05:00 PM",
            orderNumber: 890,
            lot: 50,
            category: "Watches",
            subCategory: "Vintage",
            winner: {
                email: "winner6@example.com",
                phone: "+92(51)4321 0987",
                location: "#67 Green Avenue, Islamabad, Pakistan"
            }
        }
    },
    {
        id: 7,
        lotNumber: "7",
        name: "Timeless Gold Ring Collection",
        description: "A luxurious gold ring with a custom design.",
        countDown: "11 days",
        location: "New York, USA",
        image: '/assets/pngs/watch.png',
        images: images,
        type: "current",
        highestBid: "12,000.90",
        sold: false,
        details: {
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae laudantium repudiandae dignissimos, numquam quod id, aliquid itaque at recusandae amet temporibus harum. Error, sunt a. Ipsum vel quae dolorem ducimus tempore fugit culpa itaque, accusantium odit! Nesciunt sint quod eligendi?",
            date: "30-04-2024 to 06-05-2024",
            time: "02:00 PM to 06:00 PM",
            orderNumber: 1234,
            lot: 60,
            category: "Jewelry",
            subCategory: "Rings",
            winner: {
                email: "winner7@example.com",
                phone: "+61(09)1212 3434",
                location: "#12 Wall Street, New York, NY 10005, USA"
            }
        }
    },
    {
        id: 8,
        lotNumber: "8",
        name: "Sapphire Pendant Jewelry Collection",
        description: "A sapphire pendant with a modern touch.",
        countDown: "13 days",
        location: "United Kingdom, London",
        image: '/assets/pngs/jacket.png',
        images: images,
        type: "past",
        highestBid: "12,000.90",
        sold: true,
        details: {
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae laudantium repudiandae dignissimos, numquam quod id, aliquid itaque at recusandae amet temporibus harum. Error, sunt a. Ipsum vel quae dolorem ducimus tempore fugit culpa itaque, accusantium odit! Nesciunt sint quod eligendi?",
            date: "01-05-2024 to 07-05-2024",
            time: "03:00 PM to 07:00 PM",
            orderNumber: 3456,
            lot: 70,
            category: "Jewelry",
            subCategory: "Pendants",
            winner: {
                email: "winner8@example.com",
                phone: "+44(20)4321 1234",
                location: "#34 Regent Street, London, UK"
            }
        }
    },
    {
        id: 9,
        lotNumber: "9",
        name: "Exquisite Emerald Brooch Collection",
        description: "A beautiful emerald brooch with antique value.",
        countDown: "15 days",
        location: "Pakistan, Islamabad",
        image: '/assets/pngs/mercedes.png',
        images: images,
        type: "current",
        highestBid: "12,000.90",
        sold: false,
        details: {
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae laudantium repudiandae dignissimos, numquam quod id, aliquid itaque at recusandae amet temporibus harum. Error, sunt a. Ipsum vel quae dolorem ducimus tempore fugit culpa itaque, accusantium odit! Nesciunt sint quod eligendi?",
            date: "02-05-2024 to 08-05-2024",
            time: "04:00 PM to 08:00 PM",
            orderNumber: 5678,
            lot: 80,
            category: "Jewelry",
            subCategory: "Brooches",
            winner: {
                email: "winner9@example.com",
                phone: "+92(51)9876 5432",
                location: "#89 Margalla Road, Islamabad, Pakistan"
            }
        }
    }
];

export default lots;
