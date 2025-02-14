import gsap from "gsap";

export const TitleTransition = (
  title: React.RefObject<HTMLHeadingElement | null>,
  delay?: number
) => {
  gsap.from(title.current, {
    opacity: 0,
    y: 100,
    duration: 1,
    delay: delay,
    ease: "power2.out",
  });
};
