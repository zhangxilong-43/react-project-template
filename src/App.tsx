import { lazy, Suspense } from 'react'
// import lessStyles from '@/App.less'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Editor = lazy(() => import('project_container/Editor'))

export default () => {
  // console.log(lessStyles, 'lessStyles')

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Editor content='这是放置在微应用中的 AiEditor 组件。' />
      </Suspense>
    </div>
  )
}
