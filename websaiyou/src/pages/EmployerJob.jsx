"use client"

import { useState, useEffect, useMemo } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function EmployerJob() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Mảng các màu sáng cho skills
  const skillColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-red-100 text-red-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-indigo-100 text-indigo-700",
    "bg-teal-100 text-teal-700",
    "bg-orange-100 text-orange-700",
    "bg-cyan-100 text-cyan-700",
    "bg-lime-100 text-lime-700",
    "bg-emerald-100 text-emerald-700",
    "bg-sky-100 text-sky-700",
    "bg-amber-100 text-amber-700",
    "bg-violet-100 text-violet-700",
    "bg-fuchsia-100 text-fuchsia-700",
    "bg-rose-100 text-rose-700",
  ]

  // Tạo một map để lưu trữ màu cho mỗi kỹ năng
  const skillColorMap = useMemo(() => {
    const colorMap = {}

    // Lấy tất cả các kỹ năng từ tất cả các ứng viên
    const allSkills = candidates
      .flatMap((candidate) => candidate.skills || [])
      .filter((skill, index, self) => self.indexOf(skill) === index) // Loại bỏ trùng lặp

    // Gán màu ngẫu nhiên cho mỗi kỹ năng
    allSkills.forEach((skill) => {
      const randomIndex = Math.floor(Math.random() * skillColors.length)
      colorMap[skill] = skillColors[randomIndex]
    })

    return colorMap
  }, [candidates])

  // Hàm lấy màu cho kỹ năng
  const getSkillColor = (skill) => {
    // Nếu kỹ năng đã có màu trong map, sử dụng màu đó
    if (skillColorMap[skill]) {
      return skillColorMap[skill]
    }

    // Nếu không, tạo màu ngẫu nhiên mới
    const randomIndex = Math.floor(Math.random() * skillColors.length)
    skillColorMap[skill] = skillColors[randomIndex]
    return skillColorMap[skill]
  }

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://6811d48d3ac96f7119a5c04f.mockapi.io/TuyenDung/CV")

        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`)
        }

        const data = await response.json()
        setCandidates(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching candidates:", err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCandidates()
  }, [])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-gray-50 flex justify-center items-center min-h-[300px]">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-2 text-gray-600">Đang tải dữ liệu ứng viên...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6 bg-gray-50">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Có lỗi khi tải dữ liệu: {error}</p>
          <p className="mt-2">Vui lòng thử lại sau.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Senior Frontend Developer</h1>
        <p className="text-sm text-gray-500">{candidates.length} candidates applied</p>
      </div>

      {candidates.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          <p>Không có ứng viên nào.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <img
                    src={candidate.avatar || "/placeholder.svg?height=80&width=80"}
                    alt={candidate.name}
                    className="h-16 w-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{candidate.name}</h3>
                    <p className="text-sm text-blue-600">{candidate.title}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{candidate.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{candidate.sdt}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{candidate.address}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                  {candidate.experience && typeof candidate.experience === "object" ? (
                    Object.values(candidate.experience).map((exp, index) => (
                      <div key={index} className="mb-2">
                        <div className="font-medium text-sm">{`${exp.position} - ${exp.company}`}</div>
                        <div className="text-xs text-gray-500">{exp.date}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No experience data available</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Skills</h4>
                  {candidate.skill && Array.isArray(candidate.skill) && candidate.skill.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {candidate.skill.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${getSkillColor(skill)}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No skills data available</p>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium">
                    View Full CV
                  </button>
                  <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-md text-sm font-medium">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
