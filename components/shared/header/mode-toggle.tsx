'use client';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const ModeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost'>
                {
                    theme === 'system' ? <SunMoon /> : theme === 'dark' ? <MoonIcon /> : <SunIcon />
                }
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='center'>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked={theme === 'system'}>
                <Button
                    variant='ghost'
                    onClick={() => setTheme('system')}
                >
                    <SunMoon /> System
                </Button>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme === 'light'}>
                <Button
                    variant='ghost'
                    onClick={() => setTheme('light')}
                >
                    <SunIcon /> Light
                </Button>
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={theme === 'dark'}>
                <Button
                    variant='ghost'
                    onClick={() => setTheme('dark')}
                >
                    <MoonIcon /> Dark
                </Button>
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default ModeToggle;