type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <main className="user-select-none">{children}</main>
        </div>
    );
};

export default Layout;
