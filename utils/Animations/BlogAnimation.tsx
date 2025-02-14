import gsap from "gsap";

export const animateVerticalBlur = (
  ref: React.RefObject<HTMLElement | null>
) => {
  gsap.from(ref.current, {
    y: 100,
    duration: 1,
    filter: "blur(10px)",
    delay: 0.5,
    ease: "power2.out",
  });
};

export const animateBlogCardOnScroll = (
  ref: React.RefObject<HTMLElement | null>,
  triggerRef: React.RefObject<HTMLElement | null>
) => {
  gsap.set(ref.current, { opacity: 1 });

  gsap.from(ref.current, {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger: triggerRef.current,
      start: "top 90%",
      end: "bottom 10%",
    },
    clearProps: "opacity,transform",
  });
};
