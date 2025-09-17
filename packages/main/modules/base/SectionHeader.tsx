export function SectionHeader({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="my-8 text-left text-2xl font-bold dark:text-white sm:text-center md:text-3xl">
            {children}
        </h2>
    );
}
