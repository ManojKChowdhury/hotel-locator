export default interface Hotel {
    position: [number, number],
    distance: number,
    title: string,
    averageRating: number,
    category: {
        id: string,
        title: string,
        href: string,
        type: string,
        system: string
    },
    icon: string,
    vicinity: string,
    having: [],
    type: string,
    href: string,
    id: string,
    openingHours: {
        text: string,
        label: string,
        isOpen: true,
        structured: [
        ]
    },
    chainIds: [],
    alternativeNames: []
}