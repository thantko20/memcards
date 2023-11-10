/// <reference types="lucia" />

import { users } from "@/lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";

declare namespace Lucia {
  type Auth = import("./src/lib/lucia").Auth;

  type DatabaseUserAttributes = InferSelectModel<typeof users>;
  type DatabaseSessionAttributes = {};
}
