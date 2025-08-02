"use client";
import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const StartUpForm = () => {
  const [error, seterror] = useState<Record<string, string>>({});

  const [pitch, setPitch] = useState("");
  const isPending = false;

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Startup Submitted!",
      description: "Your startup has been successfully submitted for review.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="startup-form space-y-4 max-w-md">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          placeholder="Enter your startup title"
          required
          className="startup-form_input"
        />

        {error.title && <p className="text-red-500">{error.title}</p>}
      </div>
      <div>
        <label htmlFor="discription" className="startup-form_label">
          Discription{" "}
        </label>
        <Textarea
          id="description"
          name="discription"
          placeholder="Enter your startup discription"
          required
          className="startup-form_textarea"
        />

        {error.discription && (
          <p className="text-red-500">{error.discription}</p>
        )}
      </div>
      <div>
        <label htmlFor="catagory" className="startup-form_label">
          Catagory{" "}
        </label>
        <Input
          id="catagory"
          name="catagory"
          placeholder=" startup catagory (Tech, Business, Education)"
          required
          className="startup-form_input"
        />

        {error.catagory && <p className="text-red-500">{error.catagory}</p>}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          placeholder=" startup Image URL "
          required
          className="startup-form_input"
        />

        {error.link && <p className="text-red-500">{error.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch{" "}
        </label>
        <MDEditor
        value={pitch}
        id="pitch"
        preview="edit"
        height={300}
        style={{ border: "1px solid #000", borderRadius:20, overflow: "hidden" }}
        textareaProps={
          {
            placeholder: "Briefly desscrive your porblem or idea",
            required: true,
          }
        }
        previewOptions={{
            disallowedElements:['style']
        }}

        onChange={(value) => setPitch(value as string)}
      />

        {error.pitch && <p className="text-red-500">{error.pitch}</p>}
      </div>

      {/* <div>
        <label htmlFor="description" className='startup-form_label'>
          Description
        </label>
        <Textarea 
          id="description" 
          name="description" 
          placeholder="Describe your startup idea..." 
          className="min-h-[100px]"
          required
        />
      </div> */}

      <Button type="submit" className="startup-form_btn " disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-5 "/>
      </Button>
    </form>
  );
};

export default StartUpForm;
