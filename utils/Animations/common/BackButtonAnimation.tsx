import gsap from "gsap";

const BackButtonAnimation = (ref: React.RefObject<HTMLElement | null>) => {
  gsap.from(ref.current, {
    x: -40,
    opacity: 0,
    filter: "blur(10px)",
    duration: 1,
    delay: 0.5,
    ease: "power2.out",
  });
};

export default BackButtonAnimation;
