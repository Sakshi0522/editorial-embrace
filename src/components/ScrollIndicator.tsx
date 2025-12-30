const ScrollIndicator = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-muted-foreground">
      <span className="text-xs tracking-ultra uppercase font-sans">Scroll</span>
      <div className="scroll-indicator w-[1px] h-6 bg-muted-foreground/50" />
    </div>
  );
};

export default ScrollIndicator;
