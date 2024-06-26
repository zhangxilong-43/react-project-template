import { lazy, Suspense } from 'react'
import * as lessStyles from './App.less'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Editor = lazy(() => import('project_container/Editor'))

export default () => {
  return (
    <div className={(lessStyles as any).app_box}>
      <Suspense fallback={<div>Loading...</div>}>
        <Editor
          className={(lessStyles as any)['aie-theme-light']}
          content='我是在容器中抛出，在微应用中使用的 AiEditor 组件。'
        />
      </Suspense>
    </div>
  )
}
