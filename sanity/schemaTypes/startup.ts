import {  UserIcon } from 'lucide-react'
import { defineField, defineType } from 'sanity'


export const startup = defineType({
    
    name:"startup",
    title:"Startup",
    type:"document",
    icon:UserIcon,
    fields:[
        defineField({
            name:"title",
            type:"string",
        }),
        defineField({
            name:"slug",
            type:"slug",
            options:{source:"title"}
        }),
        defineField({
            name: "author",
            type: "reference",
            to: { type: "author" },
        }),
        defineField({
            name:"views",
            type:"number",
        }),
        defineField({
            name:"description",
            type:"text",
        }),
        defineField({
            name:"catagory",
            type:"string",
            validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a catagory"),
        }),
        defineField({
            name:"image",
            type:"url",
            validation: (Rule) => Rule.required().error("Please enter an image url"),
        }),
        defineField({
            name:"pitch",
            type:"markdown",
        })

    ],
   
    
})