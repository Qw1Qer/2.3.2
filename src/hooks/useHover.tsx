import { type RefObject, useEffect, useState } from "react";

export default function useHover(ref: RefObject<HTMLButtonElement | null>) {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }

        const on = () => setIsHovered(true);
        const off = () => setIsHovered(false);

        node.addEventListener("mouseenter", on);
        node.addEventListener("mouseleave", off);

        return function () {
            node.removeEventListener("mouseenter", on);
            node.removeEventListener("mouseleave", off);
        };
    }, [ref]);

    return isHovered;
}