const slots = [
    {
        id: 'P1',
        isAvailable: false,
        lat: 0,
        lng: 0,
        level:1,
        line:1
    },
    {
        id: 'P2',
        isAvailable: false,
        lat: 0,
        lng: 0,
        level:1,
        line:1,
    },
    {
        id: 'P3',
        isAvailable: false,
        lat: 0,
        lng: 0,
        level:1,
        line:1,
    },
    {
        id: 'P4',
        isAvailable: true,
        lat: 0,
        lng: 0,
        level:2,
        line:2
    },
    {
        id: 'P5',
        isAvailable: true,
        lat: 0,
        lng: 0,
        level:2,
        line:2
    },
    {
        id: 'P6',
        isAvailable: false,
        lat: 0,
        lng: 0,
        level:2,
        line:2
    },
]

const Gateway = [
    {
        id: 'G1',
        name: "Entrance",
        status: "closed",
    },
    {
        id: 'G2',
        name: "Exit",
        status: "closed",
    }
]

const data = {
    slots: slots,
    gateway: Gateway
}
export default data;