import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ô chữ bí mật · Đại đoàn kết",
  description: "Trò chơi ô chữ kiến thức tư tưởng Hồ Chí Minh về đại đoàn kết dân tộc.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
