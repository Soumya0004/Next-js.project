"use client";
import MDEditor from "@uiw/react-md-editor";
import React, { useActionState, useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";


const StartUpForm = () => {
  const [error, seterror] = useState<Record<string, string>>({});

  const [pitch, setPitch] = useState("");
    const { toast } = useToast();

    const  router = useRouter();


  const handleFormSubmit=async(prevState: any, formatDate:FormData)=>{
    try {
      const formValues={
        title:formatDate.get("title") as string,
        description:formatDate.get("description") as string,
        category:formatDate.get("category") as string,
        link:formatDate.get("link") as string,
        pitch,

      }
      await formSchema.parseAsync(formValues);
console.log(formValues)

      // const result  = await createIdea(prevState , formatDate , pitch);

      // console.log(result);

      // if( result.status === "SUCCESS"){
      //   toast({
      //     title: "Success",
      //     description: "your pitch has been created successfully",
          
      //   });
      //   router.push(`/startup/${result.id}`);
      // }
      //   return result
      
    } catch (error) {
      if(error instanceof z.ZodError){
        const fieldErrors = error.flatten().fieldErrors;
        seterror(fieldErrors as unknown as Record<string, string>);

          toast({
  title: "Error",
  description: "Please check your inputs and try again",
  variant: "destructive"
});

        return { ...prevState,
          error: 'validation failde',
          status:"ERROR"
        }
      }
        toast({
  title: "Error",
  description: "An unexpected error has occurred",
  variant: "destructive"
});
      return{
        ...prevState,
        error:"An unexpected error has occurred",
        status:"ERROR"
      }
    }

  }

  const[state , formAction , isPending] = useActionState(handleFormSubmit,{error:"" ,status:"INITIAL"});

  


  return (
    <form action={formAction} className="startup-form space-y-4 max-w-md">
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
        <label htmlFor="description" className="startup-form_label">
          Description{" "}
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter your startup description"
          required
          className="startup-form_textarea"
        />

        {error.description && (
          <p className="text-red-500">{error.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          category{" "}
        </label>
        <Input
          id="category"
          name="category"
          placeholder=" startup category (Tech, Business, Education)"
          required
          className="startup-form_input"
        />

        {error.category && <p className="text-red-500">{error.category}</p>}
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
