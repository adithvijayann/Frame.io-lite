import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Stroke = { points: number[][]; color: string };

interface DrawingOverlayProps {
  enabled: boolean;
  selectedColor: string;
  onClear?: () => void;
}

export default function DrawingOverlay({
  enabled,
  selectedColor,
  onClear,
}: DrawingOverlayProps) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<number[][]>([]);

  const pan = Gesture.Pan()
    .onStart(() => {
      if (!enabled) return;
      setCurrentStroke([]);
    })
    .onUpdate((e: any) => {
      if (!enabled) return;
      setCurrentStroke((prev) => [...prev, [e.x, e.y]]);
    })
    .onEnd(() => {
      if (!enabled || currentStroke.length === 0) return;
      setStrokes((prev) => [...prev, { points: currentStroke, color: selectedColor }]);
      setCurrentStroke([]);
    });

  const clearDrawing = () => {
    setStrokes([]);
    setCurrentStroke([]);
    onClear?.();
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <GestureDetector gesture={pan}>
        <View style={StyleSheet.absoluteFill} pointerEvents={enabled ? "auto" : "none"}>
          <Svg style={StyleSheet.absoluteFill}>
            {strokes.map((stroke, i) => (
              <Polyline
                key={i}
                points={stroke.points.map((p) => `${p[0]},${p[1]}`).join(" ")}
                fill="none"
                stroke={stroke.color}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {currentStroke.length > 0 && (
              <Polyline
                points={currentStroke.map((p) => `${p[0]},${p[1]}`).join(" ")}
                fill="none"
                stroke={selectedColor}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </Svg>
        </View>
      </GestureDetector>
    </View>
  );
}
