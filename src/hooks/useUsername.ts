import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const NAMES = [
    "Tiger",
    "Elephant",
    "Penguin",
    "Dolphin",
    "Fox",
    "Kangaroo",
    "Panda",
    "Eagle",
    "Wolf",
    "Otter"
];

const STORAGE_KEY = "chat_username"

const generateUsername = () => {
    const word = NAMES[Math.floor(Math.random() * NAMES.length)]
    return `anonymous-${word}-${nanoid(5)}`
}

export default function useUsername() {
    const [username, setUsername] = useState("");
    useEffect(() => {
        const main = () => {
            const storedName = localStorage.getItem(STORAGE_KEY)
            if (storedName) {
                setUsername(storedName)
                return
            }
            const newName = generateUsername()
            localStorage.setItem(STORAGE_KEY, newName)
            setUsername(newName)

        }
        main()
    }, [])

    return username;
}