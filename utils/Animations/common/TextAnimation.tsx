import SplitType from "split-type";
import gsap from "gsap";

export function textSplitLines(
  ref: React.RefObject<HTMLElement | null>,
  delay: number,
  paddingBottom?: string
) {
  if (ref.current) {
    const split = new SplitType(ref.current, {
      types: "lines",
    });

    split.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      if (paddingBottom) {
        wrapper.style.paddingBottom = paddingBottom;
      }
      wrapper.style.display = "block";
      if (line.parentNode) {
        line.parentNode.insertBefore(wrapper, line);
      }
      wrapper.appendChild(line);
    });

    gsap.from(split.lines, {
      filter: "blur(10px)",
      duration: 1,
      y: 100,
      opacity: 0,
      delay: delay,
      stagger: 0.05,
      ease: "power2.out",
    });

    return () => {
      split.revert();
    };
  }
}
