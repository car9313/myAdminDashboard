import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconChevronRight } from '@tabler/icons-react'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { Breadcrumb, BreadcrumbItem } from '@/components/custom/breadcrumb'
import { PinInput, PinInputField } from '@/components/custom/pin-input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const elements = [
  {
    id: 1,
    answer: 'Pregunta1',
    response: 'Respuesta1',
  },
  {
    id: 2,
    answer: 'Pregunta2',
    response: 'Respuesta2',
  },
  {
    id: 3,
    answer: 'Pregunta3',
    response: 'Respuesta3',
  },
]

export default function ExtraComponents() {
  const items = [
    { title: 'Extra Components', href: '/extra-components' },
    { title: 'Breadcrumb' },
  ].map(({ href, title }) => (
    <BreadcrumbItem key={title}>
      {href ? (
        <Link
          className='text-muted-foreground underline decoration-muted-foreground decoration-dashed underline-offset-4 hover:text-foreground hover:decoration-solid'
          to={href}
        >
          {title}
        </Link>
      ) : (
        <span className='text-muted-foreground'>{title}</span>
      )}
    </BreadcrumbItem>
  ))

  const [pinInput, setPinInput] = useState('')

  return (
    <>
      <div className='flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
          Extra Components
        </h1>
      </div>
      <h2 className='text-lg font-bold md:text-xl'>Breadcrumbs</h2>
      <Breadcrumb separator={<IconChevronRight size={18} />}>
        {items}
      </Breadcrumb>
      <Breadcrumb>{items}</Breadcrumb>
      <Separator />
      <h2 className='text-lg font-bold md:text-xl'>Pin Input</h2>
      //flex flex-col gap-12 lg:flex-row
      <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
        <div className='flex-1'>
          <h3 className='mb-2 font-medium'>Uncontrolled</h3>
          <Tabs defaultValue='preview'>
            <TabsList>
              <TabsTrigger value='preview'>Preview</TabsTrigger>
              <TabsTrigger value='code'>Code</TabsTrigger>
            </TabsList>
            <TabsContent value='preview'>
              <div className='flex min-h-56 items-center justify-center rounded border'>
                <PinInput
                  className='flex h-10 space-x-4'
                  onComplete={(str) => console.log('completed', str)}
                  autoFocus
                >
                  <PinInputField component={Input} />
                  <PinInputField component={Input} />
                  <Separator orientation='vertical' />
                  <PinInputField component={Input} />
                  <PinInputField component={Input} />
                </PinInput>
              </div>
            </TabsContent>
            <TabsContent value='code'>
              <SyntaxHighlighter
                language='tsx'
                style={nord}
                wrapLines
                wrapLongLines
                className='max-h-96 overflow-auto'
              >
                {`<PinInput
  className='flex h-10 space-x-4'
  defaultValue=''
  onComplete={(str) => 
    console.log('completed', str)
  }  
  autoFocus
>
  <PinInputField component={Input} />
  <PinInputField component={Input} />
  <Separator orientation='vertical' />
  <PinInputField component={Input} />
  <PinInputField component={Input} />
</PinInput>
`}
              </SyntaxHighlighter>
            </TabsContent>
          </Tabs>
        </div>
        <div className='flex-1'>
          <h3 className='mb-2 font-medium'>Controlled</h3>
          <Tabs defaultValue='preview'>
            <TabsList>
              <TabsTrigger value='preview'>Preview</TabsTrigger>
              <TabsTrigger value='code'>Code</TabsTrigger>
            </TabsList>
            <TabsContent value='preview'>
              <div className='flex min-h-56 items-center justify-center rounded border'>
                <PinInput
                  className='flex h-10 space-x-4'
                  value={pinInput}
                  onChange={setPinInput}
                  onComplete={(str) => console.log('completed', str)}
                >
                  {Array.from({ length: 4 }, (_, i) => (
                    <PinInputField key={i} component={Input} />
                  ))}
                </PinInput>
              </div>
            </TabsContent>
            <TabsContent value='code'>
              <SyntaxHighlighter
                language='tsx'
                style={nord}
                wrapLines
                wrapLongLines
                className='max-h-96 overflow-auto'
              >
                {`function ControlledPinInput() {
  const [pinInput, setPinInput] = useState('');

  return (
    <PinInput
      className='flex h-10 space-x-4'
      value={pinInput}
      onChange={setPinInput}
      onComplete={(str) => 
        console.log('completed', str)
      }
    >
      {Array.from({ length: 4 }, (_, i) => (
        <PinInputField key={i} component={Input} />
      ))}
    </PinInput>
  )
}`}
              </SyntaxHighlighter>
            </TabsContent>
          </Tabs>
        </div>
        <div className='flex-1'>
          <h3 className='mb-2 font-medium'>Accordion Single</h3>
          <Tabs defaultValue='preview'>
            <TabsList>
              <TabsTrigger value='preview'>Preview</TabsTrigger>
              <TabsTrigger value='code'>Code</TabsTrigger>
            </TabsList>
            <TabsContent value='preview'>
              <div className='flex min-h-56 items-center justify-center rounded border'>
                <Accordion type='single' collapsible className='mx-4 w-full'>
                  {elements.map((element) => (
                    <AccordionItem value={'Id ' + element.id} key={element.id}>
                      <AccordionTrigger>{element.answer}</AccordionTrigger>
                      <AccordionContent>{element.response}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            <TabsContent value='code'>
              <SyntaxHighlighter
                language='tsx'
                style={nord}
                wrapLines
                wrapLongLines
                className='max-h-96 overflow-auto'
              >
                {`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
 
export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`}
              </SyntaxHighlighter>
            </TabsContent>
          </Tabs>
        </div>
        <div className='flex-1'>
          <h3 className='mb-2 font-medium'>Accordion Multiple</h3>
          <Tabs defaultValue='preview'>
            <TabsList>
              <TabsTrigger value='preview'>Preview</TabsTrigger>
              <TabsTrigger value='code'>Code</TabsTrigger>
            </TabsList>
            <TabsContent value='preview'>
              <div className='flex min-h-56 items-center justify-center rounded border'>
                <Accordion type='multiple' className='mx-4 w-full'>
                  {elements.map((element) => (
                    <AccordionItem value={'Id ' + element.id} key={element.id}>
                      <AccordionTrigger>{element.answer}</AccordionTrigger>
                      <AccordionContent>{element.response}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
            <TabsContent value='code'>
              <SyntaxHighlighter
                language='tsx'
                style={nord}
                wrapLines
                wrapLongLines
                className='max-h-96 overflow-auto'
              >
                {`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
 
export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`}
              </SyntaxHighlighter>
            </TabsContent>
          </Tabs>
        </div>
        <div className='flex-1'>
          <h3 className='mb-2 font-medium'>Controlled</h3>
          <Tabs defaultValue='preview'>
            <TabsList>
              <TabsTrigger value='preview'>Preview</TabsTrigger>
              <TabsTrigger value='code'>Code</TabsTrigger>
            </TabsList>
            <TabsContent value='preview'>
              <div className='flex min-h-56 items-center justify-center rounded border'>
                <PinInput
                  className='flex h-10 space-x-4'
                  value={pinInput}
                  onChange={setPinInput}
                  onComplete={(str) => console.log('completed', str)}
                >
                  {Array.from({ length: 4 }, (_, i) => (
                    <PinInputField key={i} component={Input} />
                  ))}
                </PinInput>
              </div>
            </TabsContent>
            <TabsContent value='code'>
              <SyntaxHighlighter
                language='tsx'
                style={nord}
                wrapLines
                wrapLongLines
                className='max-h-96 overflow-auto'
              >
                {`function ControlledPinInput() {
  const [pinInput, setPinInput] = useState('');

  return (
    <PinInput
      className='flex h-10 space-x-4'
      value={pinInput}
      onChange={setPinInput}
      onComplete={(str) => 
        console.log('completed', str)
      }
    >
      {Array.from({ length: 4 }, (_, i) => (
        <PinInputField key={i} component={Input} />
      ))}
    </PinInput>
  )
}`}
              </SyntaxHighlighter>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
