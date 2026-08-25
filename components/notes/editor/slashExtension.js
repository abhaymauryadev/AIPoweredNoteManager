import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import { ReactRenderer } from '@tiptap/react'
import SlashCommandList from './SlashCommandList'
import { Sparkles, FileText, Bot } from 'lucide-react'
import React from 'react'

const getSuggestionItems = ({ query }) => {
  return [
    {
      title: 'Ask AI',
      description: 'Ask AI to write anything',
      icon: React.createElement(Sparkles, { className: 'w-4 h-4' }),
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
        document.dispatchEvent(new CustomEvent('ai-ask'))
      },
    },
    {
      title: 'Summarize',
      description: 'Summarize the current note',
      icon: React.createElement(FileText, { className: 'w-4 h-4' }),
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
        document.dispatchEvent(new CustomEvent('ai-summarize'))
      },
    },
    {
      title: 'Fix Grammar',
      description: 'Correct spelling and grammar',
      icon: React.createElement(Bot, { className: 'w-4 h-4' }),
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).run()
        document.dispatchEvent(new CustomEvent('ai-fix-grammar'))
      },
    },
  ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase()))
}

const renderItems = () => {
  let component
  let container

  const updatePosition = (clientRect) => {
    if (!container || !clientRect) return
    const rect = typeof clientRect === 'function' ? clientRect() : clientRect
    if (!rect) return
    container.style.top = `${rect.bottom + window.scrollY + 4}px`
    container.style.left = `${rect.left + window.scrollX}px`
  }

  return {
    onStart: props => {
      component = new ReactRenderer(SlashCommandList, {
        props,
        editor: props.editor,
      })

      container = document.createElement('div')
      container.style.cssText = 'position:absolute;z-index:9999;'
      container.appendChild(component.element)
      document.body.appendChild(container)

      updatePosition(props.clientRect)
    },

    onUpdate(props) {
      component.updateProps(props)
      updatePosition(props.clientRect)
    },

    onKeyDown(props) {
      if (props.event.key === 'Escape') {
        container.remove()
        return true
      }
      return component.ref?.onKeyDown(props)
    },

    onExit() {
      container?.remove()
      component.destroy()
    },
  }
}

export const SlashCommands = Extension.create({
  name: 'slashCommands',

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        },
        items: getSuggestionItems,
        render: renderItems,
      }),
    ]
  },
})
