interface PreloaderProps {
  fade: boolean;
}

function Preloader({ fade = false }: PreloaderProps) {
  return (
    <div role="status" className={`flex items-center justify-center w-full h-dvh bg-bg ${fade ? "a-fade-out" : ""}`}>
      <div
        className="inline-block box-border animate-spin border-text/20 border-b-text rounded-full"
        style={{
          // spacing-page but more semantic
          width: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)",
          height: "clamp(1.5rem, 0.972rem + 2.254vw, 3rem)",
          // 5px - 2px
          borderWidth: "clamp(0.125rem, 0.059rem + 0.282vw, 0.313rem)"
        }}
      />
    </div>
  );
};

export default Preloader;
