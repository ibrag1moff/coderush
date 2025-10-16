import { Container } from '@/components/Container';
import { TypingArea } from '@/components/TypingArea';

export default function Home(){
  return (
    <Container>
      <div className='flex flex-col gap-4 mt-8'>
        <h1 className='text-5xl'>CodeRush 1.0</h1>
        <p>Talk is cheap. Show me the code! - Linus Torvalds</p>
        <TypingArea/>
      </div>
    </Container>
  )
}