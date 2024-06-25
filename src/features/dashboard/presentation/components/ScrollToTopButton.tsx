import { Affix, Button, Transition, rem } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scrollPosition > 0}>
        {(transitionStyles) => (
          <Button
            leftSection={
              <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
            }
            style={transitionStyles}
            onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
          >
            Scroll to Top
          </Button>
        )}
      </Transition>
    </Affix>
  );
}
