"use client"

export function ExpertiseSection() {
  return (
    <section className="py-16 px-4 md:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-32 relative overflow-hidden rounded-2xl bg-[#212121]">
        {/* Фоновые векторы */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Первый вектор — слева, обрезан сверху и слева */}
          <svg
            width="892"
            height="814"
            viewBox="0 0 892 814"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[-135px] top-[-132px] w-auto h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M36.6466 677.93L-54.311 677.263C-116.8 676.862 -155.324 607.47 -123.721 552.423L45.3311 257.906L155.551 456.075L36.6466 677.863V677.93Z"
              fill="#252525"
            />
            <path d="M193.5 384.89L84.7445 189.493L164.225 51.15L270.307 241.687L193.5 384.89Z" fill="#252525" />
            <path
              d="M675.373 682L592.298 681.4L490.051 497.525L599.275 293.722L746.32 558.239C777.099 613.621 737.648 682.4 675.308 681.933L675.373 682Z"
              fill="#252525"
            />
            <path
              d="M315.74 679.491H310.59L279.685 679.225L113.23 678.091L347.362 240.966L203.597 -17.7738L245.585 -91.0614C277.077 -146.077 355.056 -145.544 385.895 -90.0611L560.044 223.361L315.675 679.558L315.74 679.491Z"
              fill="#252525"
            />
          </svg>

          {/* Второй вектор — повёрнутый на -90 градусов, справа */}
          <svg
            width="1034"
            height="944"
            viewBox="0 0 1034 944"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-[564px] top-[614px] w-auto h-auto rotate-[-90deg] origin-left-top"
            preserveAspectRatio="none"
          >
            <path
              d="M36.6466 677.93L-54.311 677.263C-116.8 676.862 -155.324 607.47 -123.721 552.423L45.3311 257.906L155.551 456.075L36.6466 677.863V677.93Z"
              fill="#252525"
            />
            <path d="M193.5 384.89L84.7445 189.493L164.225 51.15L270.307 241.687L193.5 384.89Z" fill="#252525" />
            <path
              d="M675.373 682L592.298 681.4L490.051 497.525L599.275 293.722L746.32 558.239C777.099 613.621 737.648 682.4 675.308 681.933L675.373 682Z"
              fill="#252525"
            />
            <path
              d="M315.74 679.491H310.59L279.685 679.225L113.23 678.091L347.362 240.966L203.597 -17.7738L245.585 -91.0614C277.077 -146.077 355.056 -145.544 385.895 -90.0611L560.044 223.361L315.675 679.558L315.74 679.491Z"
              fill="#252525"
            />
          </svg>
        </div>

        {/* Контент */}
        <div className="relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-20">Our Expertise</h2>

          {/* Outstaffing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20 border-b border-white/40">
            <h3 className="text-3xl md:text-4xl font-medium text-white">Outstaffing</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Client-Controlled Team Member:</p>
                  <p className="text-white/60">
                    You select and manage the developer directly as if they were part of your team, while we handle HR,
                    payroll, and administrative tasks.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Flexible Team Scaling:</p>
                  <p className="text-white/60">
                    When your needs change, you can scale up or down and quickly adjust resources.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Integration & Management:</p>
                  <p className="text-white/60">
                    Developers fully integrate into your workflows, tools, and communication channels under your
                    direction.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Responsibility Split:</p>
                  <p className="text-white/60">
                    You retain full control over development and task management, while we assume responsibility for
                    employment logistics.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Outsourcing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-20 border-b border-white/40">
            <h3 className="text-3xl md:text-4xl font-medium bg-gradient-to-r from-orange-600 to-white bg-clip-text text-transparent">
              Outsourcing
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Full-Scope Delivery:</p>
                  <p className="text-white/60">
                    We take ownership of the project’s execution, from requirements and design to deployment and QA.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Third-Party Management:</p>
                  <p className="text-white/60">
                    You’re hands-off—our team handles all day-to-day management, scheduling, and deliverables.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Contract-Based Accountability:</p>
                  <p className="text-white/60">
                    We are accountable for quality, timelines, and final outcomes based on the terms of our agreement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Efficient for Full Projects:</p>
                  <p className="text-white/60">
                    Ideal when you need a specific output without involving your internal team in operations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pt-20">
            <h3 className="text-3xl md:text-4xl font-medium text-white">Consultation</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Expert Guidance:</p>
                  <p className="text-white/60">
                    Our senior technical leadership helps analyze architecture, review tech stacks, and propose
                    solutions—without committing to full delivery. (General industry practice)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 bg-primary rounded-sm" />
                </div>
                <div>
                  <p className="font-semibold text-white">Strategic Alignment:</p>
                  <p className="text-white/60">
                    We support you in making informed decisions on tech direction, scalability, and best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
