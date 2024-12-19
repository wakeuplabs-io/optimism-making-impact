export function App() {
  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <nav className="absolute bg-green-100 lg:static lg:h-full lg:w-[320px]">Sidebar</nav>
      <div className="flex flex-1 flex-col">
        <header className="bg-blue-100">Steps</header>
        <main className="flex-1 bg-red-100">Layouts</main>
      </div>
    </div>
  );
}
