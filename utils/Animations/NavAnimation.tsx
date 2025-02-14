import gsap from "gsap";

export const animateLineNav = (ref: React.RefObject<HTMLElement | null>) => {
  gsap.from(ref.current, {
    width: 0,
    duration: 0.5,
    ease: "power2.out",
  });
};
