import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '600'],
    style: ['normal', 'italic'],
    variable: '--font-cormorant',
    display: 'swap',
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-dm-sans',
    display: 'swap',
});

export const metadata = {
    title: 'Jadon Schwahn — Artist',
    description: 'Painter and draftsman working in oil, graphite, and charcoal — exploring light, stillness, and the weight of ordinary things. Bozeman, Montana.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
            <body>{children}</body>
        </html>
    );
}
