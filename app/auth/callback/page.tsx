export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CallbackClient />
    </Suspense>
  );
}
