export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-[100vh] flex justify-around items-center bg-[url('/login/pageBackground.jpg')] bg-cover bg-right">
      <div className="p-6">{children}</div>
    </div>
  );
}
