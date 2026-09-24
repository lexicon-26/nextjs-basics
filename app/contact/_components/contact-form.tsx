"use client";

import { Input } from "@/components/ui/input";

export default function ContactForm() {
  return (
    <>
      <div>
        <Input
          onChange={(e) => {
            console.log(e.currentTarget.value);
          }}
        />
      </div>
    </>
  );
}
