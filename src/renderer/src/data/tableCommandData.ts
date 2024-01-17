export type TOrder = {
    name: string;
    img: string;
    price: number;
}

export type TOrderList = {
    tableNumber: number;
    orders: TOrder[];
}

export const tableCommandData: TOrderList[] = [
    {
        tableNumber: 1,
        orders: [
            { name: "Stuffed flank steak", img: "https://source.unsplash.com/4u_nRgiLW3M/600x600", price: 3.45 },
        ],
    },
    {
        tableNumber: 2,
        orders: [
            { name: "Stuffed flank steak", img: "https://source.unsplash.com/4u_nRgiLW3M/600x600", price: 3.45 },
            { name: "Stuffed flank steak", img: "https://source.unsplash.com/4u_nRgiLW3M/600x600", price: 3.45 },
        ],
    },
    {
        tableNumber: 3,
        orders: [
            { name: "Stuffed flank steak", img: "https://source.unsplash.com/4u_nRgiLW3M/600x600", price: 3.45 },
            { name: "Stuffed flank steak", img: "https://source.unsplash.com/4u_nRgiLW3M/600x600", price: 3.45 },
            { name: "Stuffed flank steak", img: "https://source.unsplash.com/4u_nRgiLW3M/600x600", price: 3.45 },
            { name: "Stuffed flank steak", img: "https://source.unsplash.com/4u_nRgiLW3M/600x600", price: 3.45 },
            { name: "Stuffed flank steak", img: "https://source.unsplash.com/4u_nRgiLW3M/600x600", price: 3.45 },
        ],
    },
    // Add more tables with orders as needed
];