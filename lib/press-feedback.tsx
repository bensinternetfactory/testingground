import {
  useCallback,
  useRef,
  useState,
  type KeyboardEventHandler,
  type MouseEvent,
  type MouseEventHandler,
  type TouchEvent,
  type TouchEventHandler,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";

const SWIPE_THRESHOLD = 10;

export const tapSpring = {
  type: "spring" as const,
  stiffness: 600,
  damping: 30,
};

export type PressModality = "touch" | "mouse" | "keyboard";

export interface PressFeedbackRippleState {
  x: number;
  y: number;
  id: number;
}

interface UsePressFeedbackOptions<T extends HTMLElement> {
  keyboardKeys: readonly string[];
  onPress?: (modality: PressModality, event: MouseEvent<T>) => void;
}

interface UsePressFeedbackResult<T extends HTMLElement> {
  clearRipple: () => void;
  handlers: {
    onClick: MouseEventHandler<T>;
    onTouchStart: TouchEventHandler<T>;
    onTouchEnd: TouchEventHandler<T>;
    onKeyDown: KeyboardEventHandler<T>;
  };
  ripple: PressFeedbackRippleState | null;
  shouldReduceMotion: boolean;
}

interface PressFeedbackRippleProps {
  className: string;
  initialOpacity: number;
  onAnimationComplete: () => void;
  ripple: PressFeedbackRippleState | null;
  scale: number;
}

let rippleId = 0;

export function usePressFeedback<T extends HTMLElement>({
  keyboardKeys,
  onPress,
}: UsePressFeedbackOptions<T>): UsePressFeedbackResult<T> {
  const [ripple, setRipple] = useState<PressFeedbackRippleState | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { trigger } = useWebHaptics();
  const lastTapRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const pendingModalityRef = useRef<PressModality | null>(null);
  const ignoreNextClickRef = useRef(false);

  const clearRipple = useCallback(() => {
    setRipple(null);
  }, []);

  const spawnRipple = useCallback(
    (x: number, y: number) => {
      if (shouldReduceMotion) {
        return;
      }

      setRipple({ x, y, id: ++rippleId });
    },
    [shouldReduceMotion],
  );

  const onClick = useCallback(
    (event: MouseEvent<T>) => {
      if (ignoreNextClickRef.current) {
        ignoreNextClickRef.current = false;
        pendingModalityRef.current = null;
        event.preventDefault();
        return;
      }

      const nativeEvent = event.nativeEvent as unknown as {
        pointerType?: string;
      };
      const modality =
        pendingModalityRef.current ??
        (event.detail === 0
          ? "keyboard"
          : nativeEvent.pointerType === "touch"
            ? "touch"
            : "mouse");

      pendingModalityRef.current = null;

      if (modality !== "keyboard") {
        const now = Date.now();
        if (now - lastTapRef.current < 250) {
          event.preventDefault();
          return;
        }

        lastTapRef.current = now;
        try {
          trigger([{ duration: 35 }], {
            intensity: shouldReduceMotion ? 0.4 : 1,
          });
        } catch {
          // Haptics are optional feedback and must never block the CTA commit.
        }
      }

      const rect = event.currentTarget.getBoundingClientRect();
      if (modality === "keyboard") {
        spawnRipple(rect.width / 2, rect.height / 2);
      } else {
        spawnRipple(event.clientX - rect.left, event.clientY - rect.top);
      }

      onPress?.(modality, event);
    },
    [onPress, shouldReduceMotion, spawnRipple, trigger],
  );

  const onTouchStart = useCallback((event: TouchEvent<T>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const onTouchEnd = useCallback((event: TouchEvent<T>) => {
    const start = touchStartRef.current;
    if (!start) {
      return;
    }

    const touch = event.changedTouches[0];
    const dx = Math.abs(touch.clientX - start.x);
    const dy = Math.abs(touch.clientY - start.y);

    if (dx > SWIPE_THRESHOLD || dy > SWIPE_THRESHOLD) {
      ignoreNextClickRef.current = true;
      pendingModalityRef.current = null;
      event.preventDefault();
      touchStartRef.current = null;
      return;
    }

    touchStartRef.current = null;
    pendingModalityRef.current = "touch";
  }, []);

  const onKeyDown = useCallback<KeyboardEventHandler<T>>(
    (event) => {
      if (keyboardKeys.includes(event.key)) {
        pendingModalityRef.current = "keyboard";
      }
    },
    [keyboardKeys],
  );

  return {
    clearRipple,
    handlers: {
      onClick,
      onKeyDown,
      onTouchEnd,
      onTouchStart,
    },
    ripple,
    shouldReduceMotion,
  };
}

export function PressFeedbackRipple({
  className,
  initialOpacity,
  onAnimationComplete,
  ripple,
  scale,
}: PressFeedbackRippleProps) {
  if (!ripple) {
    return null;
  }

  return (
    <motion.span
      key={ripple.id}
      aria-hidden="true"
      initial={{ scale: 0, opacity: initialOpacity }}
      animate={{ scale, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onAnimationComplete={onAnimationComplete}
      className={className}
      style={{ left: ripple.x, top: ripple.y }}
    />
  );
}
