export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-line px-[5vw] py-[60px] text-[0.8rem] text-grey">
      <div className="font-display text-[1.8rem] leading-none text-white">ADIDAS</div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span>&copy; 2026 Adidas Sports Shop</span>
        <span>&middot;</span>
        <a href="#" className="hover:text-white">Privacy</a>
        <span>&middot;</span>
        <a href="#" className="hover:text-white">Terms</a>
        <span>&middot;</span>
        <a href="#" className="hover:text-white">Cookies</a>
      </div>
    </footer>
  );
}
