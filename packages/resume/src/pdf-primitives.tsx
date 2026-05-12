import { Text, View } from "@react-pdf/renderer";
import { tw } from "./utils/tw";

interface PdfSectionTitleProps {
  children: string;
  accentColor: string;
}

export function PdfSectionTitle({
  children,
  accentColor,
}: PdfSectionTitleProps) {
  return (
    <View style={tw("mb-2")}>
      <Text
        style={{
          ...tw("text-[8px] font-bold uppercase tracking-widest mb-0.5"),
          color: accentColor,
        }}
      >
        {children}
      </Text>
      <View style={{ height: 1, backgroundColor: accentColor, opacity: 0.3 }} />
    </View>
  );
}
