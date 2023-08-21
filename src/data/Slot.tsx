const slots = [
    {
        id: 'P1',
        isAvailable: true,
    },
    {
        id: 'P2',
        isAvailable: false,
    },
    {
        id: 'P3',
        isAvailable: false,
    },
    {
        id: 'P4',
        isAvailable: true,
    },
    {
        id: 'P5',
        isAvailable: false,
    },
    {
        id: 'P6',
        isAvailable: true,
    },
]

const Gateway = [
    {
        id:'G1',
        name: "Entrance",
        status:"closed",
    },
    {
        id:'G2',
        name:"Exit",
        status:"closed",
    }
]

const data = {
    slots: slots,
    gateway: Gateway
}
export default data;