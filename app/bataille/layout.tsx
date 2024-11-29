export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col justify-center items-center bg-cover bg-[url('/images/tapis.jpg')]">
      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
