"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EventsRootPage() {
    const router = useRouter();

    useEffect(() => {
        router.push("/events/sailboat");
    }, [router]);

    return null;
}
