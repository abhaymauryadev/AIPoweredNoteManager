import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { ReactRenderer } from '@tiptap/react'
import tippy from 'tippy.js'
import SlashCommandList from './SlashCommandList'
import { Sparkles, FileText, Bot } from 'lucide-react'
import React from 'react'

const getSuggestionItems = ({ query }) => {
  return [
    {
      title: 'Ask AI',
      description: 'Ask AI to write anything',
      icon: <Sparkles className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
        // Trigger generic AI ask in parent
        document.dispatchEvent(new CustomEvent('ai-ask'))
      },
    },
    {
      title: 'Summarize',
      description: 'Summarize the current note',
      icon: <FileText className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
        // Trigger summarize in parent
        document.dispatchEvent(new CustomEvent('ai-summarize'))
      },
    },
    {
      title: 'Fix Grammar',
      description: 'Correct spelling and grammar',
      icon: <Bot className="w-4 h-4" />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
         // Trigger fix grammar in parent
        document.dispatchEvent(new CustomEvent('ai-fix-grammar'))
      },
    },
  ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10)
}

const renderItems = () => {
  let component
  let popup

  return {
    onStart: props => {
      component = new ReactRenderer(SlashCommandList, {
        props,
        editor: props.editor,
      })

      if (!props.clientRect) {
        return
      }

      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },

    onUpdate(props) {
      component.updateProps(props)

      if (!props.clientRect) {
        return
      }

      popup[0].setProps({
        getReferenceClientRect: props.clientRect,
      })
    },

    onKeyDown(props) {
      if (props.event.key === 'Escape') {
        popup[0].hide()

        return true
      }

      return component.ref?.onKeyDown(props)
    },

    onExit() {
      popup[0].destroy()
      component.destroy()
    },
  }
}

export const SlashCommands = Extension.create({
  name: 'slashCommands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

export const slashCommandPlugin = {
    char: '/',
    command: ({ editor, range, props }) => {
        props.command({ editor, range });
    },
    items: getSuggestionItems,
    render: renderItems,
}
